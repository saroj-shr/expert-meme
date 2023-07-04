export async function Home(req, res, next) {
    try {
      let data = {};
  
      if (req.name === 'Admin') {
        data = {
          message: "Welcome, superuser!",
          name: req.name
        };
      } else {
        data = {
          message: "Welcome, user!",
          name: req.name
        };
      }
  
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }