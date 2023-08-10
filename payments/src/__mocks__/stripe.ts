export const stripe = {
    charges: {
        // will return the promise immediately that automatically resolve itself
        create: jest.fn().mockResolvedValue({
            id: "abcd"
        })
    }
};