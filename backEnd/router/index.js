const Authentication = require("../controllers/authentication");
const passportService = require("../services/passport");
const passport = require("passport");
const crud = require("../controllers/crud");
const profile = require("../controllers/profile");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.send({ hi: "there" });
  });
  app.get("/getMyLists", requireAuth, crud.getMyLists);
  app.get("/getList", requireAuth, crud.getList);
  app.post("/signup", Authentication.signup);
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/addToList", requireAuth, crud.addToList);
  app.post("/deleteFromList", requireAuth, crud.deleteFromList);
  app.post("/createList", requireAuth, crud.createList);
  app.post("/deleteList", requireAuth, crud.deleteList);
  app.get("/getCommLists", requireAuth, crud.getCommLists);
  app.post("/editList", requireAuth, crud.editList);
  app.get("/confirm/:token", Authentication.activate);
  app.get("/getProfile", requireAuth, profile.getProfile);
  app.post("/updateProfile", requireAuth, profile.updateProfile);
  app.post("/updatePfp", requireAuth, profile.updatePfp);
  app.post(
    "/uploadPfp",
    [requireAuth, upload.single("pfpUpload")],
    profile.uploadPfp
  );
};
