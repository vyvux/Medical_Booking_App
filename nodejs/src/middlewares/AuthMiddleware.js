import { verify, decode } from "jsonwebtoken";

let validateToken = (req, res, next) => {
  let accessToken = req.header("accessToken");
  if (!accessToken) {
    return res.json({ error: "Unauthenticated login" });
  }

  try {
    let validToken = verify(accessToken, "highlysecurity");
    if (validToken) {
      return next();
    }
  } catch (e) {
    return res.json({ error: e });
  }
};

// let checkUserAuthorization = (req, res, next) => {
//   let accessToken = req.header("accessToken");
//   try {
//     if (!accessToken) {
//       return res.json({ error: "no access token found" });
//     }
//     let decodedValue = decode(accessToken);

//     if (decodedValue) {
//       console.log("from checkrole middleware", decodedValue);
//       return next();
//     } else {
//       console.log("error from check user authorization middleware");
//     }
//   } catch (e) {
//     return res.json({ error: e });
//   }
// };

module.exports = { validateToken };
