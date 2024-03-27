import type {
  MiddlewaresConfig,
  User,
  UserService,
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa";
import cors from "cors";

const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7001;http://localhost:7000";
const registerLoggedInUser = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction,
) => {
  let loggedInUser: User | null = null;

  if (req.user && req.user.userId) {
    const userService = req.scope.resolve("userService") as UserService;
    loggedInUser = await userService.retrieve(req.user.userId);
  }

  req.scope.register({
    loggedInUser: {
      resolve: () => loggedInUser,
    },
  });

  next();
};

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/admin/products",
      middlewares: [registerLoggedInUser],
    },
    {
      matcher: "/admin/auth",
      middlewares: [
        cors({
          origin: [
            STORE_CORS,
            "http://localhost:7001",
            "http://localhost:7000",
          ],
          credentials: true,
        }),
      ],
    },
    {
      matcher: "/admin/collections",
      middlewares: [
        cors({
          origin: [
            STORE_CORS,
            "http://localhost:7001",
            "http://localhost:7000",
          ],
          credentials: true,
        }),
      ],
    },
    {
      matcher: "/admin/*",
      middlewares: [
        cors({
          origin: ["http://localhost:7001", "http://localhost:7000"],
          credentials: true,
        }),
      ],
    },
    {
      matcher: "/custom/*",
      middlewares: [
        cors({
          origin: "*",
          credentials: true,
        }),
      ],
    },
    {
      matcher: "/admin/currencies",
      middlewares: [
        cors({
          origin: "*",
          credentials: true,
        }),
      ],
    },
  ],
};
