export const natsWrapper = {
    client: {
        // Works but we want to test the function that is actually called
        // publish: (subject: string, data: string, callback: () => void) => {
        //     callback();
        // },
        publish: jest
            .fn()
            .mockImplementation(
                (subject: string, data: string, callback: () => void) => {
                    callback();
                }
            )
    }
};