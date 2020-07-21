import { Injector, Type } from '@angular/core';

export class DependencyInjector {

    private static injector: Injector;

    public static setup(injector: Injector) {
        DependencyInjector.injector = injector;
    }

    public static inject<T>(cls: Type<T>) {
        return DependencyInjector.injector.get(cls);
    }

}