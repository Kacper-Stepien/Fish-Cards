
// autobind decorator
export function autobind(
     _: any,     // target object 
    _2: string,  // name of the method
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjDescriptor;
}
