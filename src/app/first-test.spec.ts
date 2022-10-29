describe('First Test Suite', () => {
    let testObj: any;
    let testService: any;
    beforeEach(() => {
        testObj = { a: false };
        testService = {
            testMethod: () => { throw new Error('ERROR'); }
        };
    });
    it('should return property true if set to true', () => {
        testObj.a = true;
        expect(testObj.a).toBeTrue();
    });

    it('should throw an error', () => {
        expect(testService.testMethod).toThrow();
    });
});
