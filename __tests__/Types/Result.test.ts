import {Result} from '../../src/app/shared/Types/Result';

describe('Result Pattern', () => {
  describe('ok - success case', () => {
    it('should create a successful result', () => {
      const result = Result.ok(42);
      
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.getValue()).toBe(42);
    });

    it('should work with string values', () => {
      const result = Result.ok('success');
      
      expect(result.isSuccess).toBe(true);
      expect(result.getValue()).toBe('success');
    });

    it('should work with object values', () => {
      const user = {id: 1, name: 'John'};
      const result = Result.ok(user);
      
      expect(result.getValue()).toEqual(user);
    });
  });

  describe('fail - error case', () => {
    it('should create a failed result', () => {
      const result = Result.fail('Error occurred');
      
      expect(result.isSuccess).toBe(false);
      expect(result.isFailure).toBe(true);
      expect(result.getError()).toBe('Error occurred');
    });

    it('should work with Error objects', () => {
      const error = new Error('Something went wrong');
      const result = Result.fail(error);
      
      expect(result.isFailure).toBe(true);
      expect(result.getError()).toBe(error);
    });
  });

  describe('getValue', () => {
    it('should return value for successful result', () => {
      const result = Result.ok(100);
      expect(result.getValue()).toBe(100);
    });

    it('should throw error when getting value from failed result', () => {
      const result = Result.fail('Error');
      expect(() => result.getValue()).toThrow('Cannot get value from failed result');
    });
  });

  describe('getError', () => {
    it('should return error for failed result', () => {
      const result = Result.fail('Error message');
      expect(result.getError()).toBe('Error message');
    });

    it('should throw error when getting error from successful result', () => {
      const result = Result.ok(42);
      expect(() => result.getError()).toThrow('Cannot get error from successful result');
    });
  });

  describe('map', () => {
    it('should transform successful result', () => {
      const result = Result.ok(5);
      const mapped = result.map(x => x * 2);
      
      expect(mapped.isSuccess).toBe(true);
      expect(mapped.getValue()).toBe(10);
    });

    it('should not transform failed result', () => {
      const result: Result<number, string> = Result.fail('Error');
      const mapped = result.map(x => x * 2);
      
      expect(mapped.isFailure).toBe(true);
      expect(mapped.getError()).toBe('Error');
    });

    it('should work with type transformations', () => {
      const result = Result.ok(42);
      const mapped = result.map(x => `Number: ${x}`);
      
      expect(mapped.getValue()).toBe('Number: 42');
    });
  });

  describe('flatMap', () => {
    it('should chain successful results', () => {
      const result = Result.ok(5);
      const chained = result.flatMap(x => Result.ok(x * 2));
      
      expect(chained.isSuccess).toBe(true);
      expect(chained.getValue()).toBe(10);
    });

    it('should propagate failure from original result', () => {
      const result = Result.fail(new Error('Initial error'));
      const chained = result.flatMap((x: number) => Result.ok(x * 2));
      
      expect(chained.isFailure).toBe(true);
      expect(chained.getError().message).toBe('Initial error');
    });

    it('should propagate failure from chained operation', () => {
      const result = Result.ok(5);
      const chained = result.flatMap(() => Result.fail(new Error('Chained error')));
      
      expect(chained.isFailure).toBe(true);
      expect(chained.getError().message).toBe('Chained error');
    });

    it('should work with complex chaining', () => {
      const result = Result.ok(10)
        .flatMap(x => Result.ok(x + 5))
        .flatMap(x => Result.ok(x * 2));
      
      expect(result.getValue()).toBe(30);
    });
  });

  describe('onSuccess', () => {
    it('should execute callback for successful result', () => {
      const callback = jest.fn();
      const result = Result.ok(42);
      
      result.onSuccess(callback);
      
      expect(callback).toHaveBeenCalledWith(42);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not execute callback for failed result', () => {
      const callback = jest.fn();
      const result = Result.fail('Error');
      
      result.onSuccess(callback);
      
      expect(callback).not.toHaveBeenCalled();
    });

    it('should allow chaining', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const result = Result.ok(42);
      
      result.onSuccess(callback1).onSuccess(callback2);
      
      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });

  describe('onFailure', () => {
    it('should execute callback for failed result', () => {
      const callback = jest.fn();
      const result = Result.fail('Error message');
      
      result.onFailure(callback);
      
      expect(callback).toHaveBeenCalledWith('Error message');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not execute callback for successful result', () => {
      const callback = jest.fn();
      const result = Result.ok(42);
      
      result.onFailure(callback);
      
      expect(callback).not.toHaveBeenCalled();
    });

    it('should allow chaining', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const result = Result.fail('Error');
      
      result.onFailure(callback1).onFailure(callback2);
      
      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });

  describe('combined usage', () => {
    it('should work with onSuccess and onFailure together', () => {
      const successCallback = jest.fn();
      const failureCallback = jest.fn();
      
      const successResult = Result.ok(42);
      successResult.onSuccess(successCallback).onFailure(failureCallback);
      
      expect(successCallback).toHaveBeenCalledWith(42);
      expect(failureCallback).not.toHaveBeenCalled();
    });

    it('should handle failure path correctly', () => {
      const successCallback = jest.fn();
      const failureCallback = jest.fn();
      
      const failureResult = Result.fail('Error');
      failureResult.onSuccess(successCallback).onFailure(failureCallback);
      
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).toHaveBeenCalledWith('Error');
    });

    it('should work with map and callbacks', () => {
      const callback = jest.fn();
      
      Result.ok(5)
        .map(x => x * 2)
        .map(x => x + 10)
        .onSuccess(callback);
      
      expect(callback).toHaveBeenCalledWith(20);
    });

    it('should handle error in chained operations', () => {
      const errorCallback = jest.fn();
      
      Result.ok(5)
        .flatMap(() => Result.fail(new Error('Error in chain')))
        .map(x => x * 2) // This should not execute
        .onFailure(errorCallback);
      
      expect(errorCallback).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Error in chain'
      }));
    });
  });
});
