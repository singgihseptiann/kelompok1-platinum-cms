import { setupServer } from "msw/node";

import { handlers } from "./handler";

const mockServer = setupServer(...handlers);

export default mockServer;
