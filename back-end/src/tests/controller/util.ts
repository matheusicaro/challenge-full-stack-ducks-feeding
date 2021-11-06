type Req = {
  body?: any;
  params?: any;
  header?: any;
};

type Res = {
  send?: any;
  status?: any;
  json?: any;
};

export const mockRequest = (header?: string): Req => {
  const req: Req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  req.header = jest.fn().mockReturnValue(header);
  return req;
};

export const mockResponse = (): Res => {
  const res: Res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
