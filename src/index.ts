import { FixtureBucket } from '@app/FixtureBucket';

export { FixtureContainer } from '@app/FixtureContainer';
export { FixtureBucket };

export interface FixtureImporterInterface {
  import(rootDir?: string | undefined): Promise<readonly unknown[]>;
}

export interface InjectDependency<T = unknown> extends Function {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: readonly any[]): T;
}

export interface DependencyInjectable {
  getInjectDependencies(): readonly InjectDependency[];
}

export interface ServiceContainerInterface {
  getService<TInput = unknown, TResult = TInput>(
    typeOrToken: InjectDependency<TInput> | string
  ): TResult;
}

export type FixtureDependency = FixtureConstructor;

export interface DependentFixtureInterface {
  getFixtureDependencies(): readonly FixtureConstructor[];
}

export type SaveOnTagsMathFn = () => Promise<unknown>;

export type FixtureConstructor = new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => FixtureInterface<unknown>;
export type FixtureInstallOptions = {
  readonly saveOnTagMath: (fn: SaveOnTagsMathFn) => void;
};

export type FixtureLoadFilters = {
  readonly tags: readonly string[];
};

export interface FixtureInterface<ResultType> {
  install(fixtureSetupBucket: FixtureBucket, options: FixtureInstallOptions): Promise<ResultType>;
}

export interface TaggableInterface {
  getTags(): readonly string[];
}
