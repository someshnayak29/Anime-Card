import jwt from 'jsonwebtoken'; 

//next means do something and then move onto the next thing

const auth = async(req, res, next) => {
    try {
        // now when user has to delete, or do anything we will check the if his token is valid
        const token = req.headers.authorization.split(" ")[1];
        // we will have 2 tokens one from our jwt and another from googleOauth
        const isCustomAuth = token.length < 500; // > 500 is Oauth and < 500 is ours

        let decodedData; // data we want to get from token itself

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test'); // this will give us data from each specific token i.e. username and id of person
            // secret should be same that we used during creation the token i.e. here 'test'
            
            // now we know which user is logged in and which user is liking the post and deleting the post
            req.userId = decodedData?.id;
        }
        else{
            decodedData = jwt.decode(token); // for Oauth it is decode function and we dont need token
            req.userId = decodedData?.sub; // sub is google's name for specific id that differents every single google user
        }
        next(); // pass the action onto second thing for e.g. If user wants to like the post
        // clicks like button => check if he is eligible to like the post : auth middleware(next) => like controller...

        // This is what middleware is for, i.e. for any kind of action that happerns before something


    } catch (error) {
        console.log(error);
    }
}

export default auth;

/* we use this middleware in the routes, for e.g. when somebody likes something we will use this middleware in routes, here to check
authority of user */

// if we are calling a middleware before a specific action, we can populate the req e.g req.userId and we can access that request in the next action that we do
// therefore likePost will have access to req.userId

// user info comes with request in form of token in headers from frontend as we added in interceptor in frontend api