export type EndLog = {
  success: (res: unknown) => void;
  fail: (err: unknown) => void;
};

export const startLog = (key: string, method: "GET" | "POST") => {
  console.log(`[local-server] ${method} ${key}`);
  return {
    success: (res: unknown) => {
      console.log(`[local-server] ${method} ${key} successed with response:`);
      console.dir(res);
    },
    fail: (err: unknown) => {
      console.log(`[local-server] ${method} ${key} fail with error:`);
      console.dir(err);
    },
  };
};
