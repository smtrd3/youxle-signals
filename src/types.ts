export type Accessor<T> = () => T;

export type Setter<T> = (value: T) => void;

export type SubscribedFn = () => void;

export type Subscriptions = Set<SubscribedFn>;

export type Running = {
  effect: SubscribedFn;
  signalSubscriptionsBacklink: Set<Subscriptions>;
};

export type Context = Running[];