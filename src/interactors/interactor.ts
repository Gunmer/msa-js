export abstract class Interactor<P, R> {
  async execute(param: P): Promise<R> {
    try {
      return this._execute(param)
    } catch (e) {
      throw this.catch(e)
    }
  }

  protected abstract async _execute(param: P): Promise<R>

  // noinspection JSMethodCanBeStatic
  protected catch(e: any) {
    return e
  }
}
