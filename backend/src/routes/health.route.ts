import {Hono} from 'hono'
import { successResponse } from '../utils/response';

export const healthRoute = new Hono()

healthRoute.get("/", (c) => {
  return c.json(
    successResponse(
      {
        status: "ok",
      },
      "VitaQera API is running"
    ),
  );
});