const Router = require("express");
const userOp = require("../controllers/users.js");
const router = Router();

router.post("/add-user", async (req, res) => {
  try {
    const { name, email, password, phoneNo } = req.body;
    const newUser = await userOp.addNewUser({ name, email, password, phoneNo });
    return res.status(200).send(newUser);
  } catch (e) {
    return res.status(404).json({
      errors: {
        body: [e.message],
      },
    });
  }
});

router.post("/login-user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userOp.getUser({ email, password });
    return res.status(200).send(user);
  } catch (e) {
    return res.status(404).json({
      errors: {
        body: [e.message],
      },
    });
  }
});

const userRoute = router;
module.exports = userRoute;
