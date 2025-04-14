import { getCustomSession } from "../sessionCode.js";


export async function GET(req, res) {

  let session = await getCustomSession();
  
  let email = session.email;
  let fullName = session.fullName;
  console.log(email);
  console.log(fullName);


  return Response.json({"email": email, "fullName": fullName });

}