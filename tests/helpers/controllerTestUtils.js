const createMocks = ({
    body = {},
    params = {},
    query = {},
    user = { id: "user-123", role: "ADMIN" },
} = {}) => {
    const req = { body, params, query, user };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const next = jest.fn();

    return { req, res, next };
};

const runSuccessCase = async ({
    controller,
    service,
    method,
    request,
    args,
    result,
    status,
    expectedResponse,
}) => {
    const { req, res, next } = createMocks(request);
    service[method].mockResolvedValue(result);

    await controller(req, res, next);

    expect(service[method]).toHaveBeenCalledWith(...args(req));
    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining(expectedResponse),
    );
    expect(next).not.toHaveBeenCalled();
};

const runNotFoundCase = async ({
    controller,
    service,
    method,
    request,
    args,
    message,
}) => {
    const { req, res, next } = createMocks(request);
    service[method].mockResolvedValue(null);

    await controller(req, res, next);

    expect(service[method]).toHaveBeenCalledWith(...args(req));
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        message,
    });
    expect(next).not.toHaveBeenCalled();
};

const runNextErrorCase = async ({
    controller,
    service,
    method,
    request,
    args,
}) => {
    const { req, res, next } = createMocks(request);
    const error = new Error("Erreur serveur");
    service[method].mockRejectedValue(error);

    await controller(req, res, next);

    expect(service[method]).toHaveBeenCalledWith(...args(req));
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
};

module.exports = {
    createMocks,
    runSuccessCase,
    runNotFoundCase,
    runNextErrorCase,
};
