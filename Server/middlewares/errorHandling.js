const errorHandler=(error, request, response, next) => {   
    const statusCode=response.statusCode ==200? 500: response.statusCode;
    console.log(error);
    response.status(statusCode).json({
        message:error.message,
        stack:process.env.NODE_ENV =='production'?null:error.stack
    })
     }
module.exports= {errorHandler}