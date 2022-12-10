const express = require("express")
const router = express.Router(); 

const { getUserById, getUser, updateUser, getUserPurchaseList } = require("../controllers/user")
const {isSignedIn, isAuthorized, isAdmin} = require("../controllers/authentication");


router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthorized, getUser);
router.put("/user/:userId", isSignedIn, isAuthorized, updateUser);
router.get("/orders/user/:userId", isSignedIn, isAuthorized, getUserPurchaseList); 
// when a user routes to eg: /user/32, the param method will be called and in turn it calls getUserById method
// of user controller, which sets the req.profile to user, then check will be made if user is signedIn, isAuthorized, and then is returned a user object if exists
// NOTE: PARAM WILL BE CALLED ONLY ONCE, EVEN IF PARAM MATCHES FOR MULTIPLE ROUTES  


module.exports = router;