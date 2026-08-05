import jwt from "jsonwebtoken";


export function verifyToken(token:string){

  try{

    return jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

  }
  catch(error){

    console.log("JWT VERIFY ERROR:", error);

    return null;

  }

}