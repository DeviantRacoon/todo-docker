import { BaseModel, AutoAccessor } from "src/app/bases/classes.base";

export class User extends BaseModel {
  @AutoAccessor()
  private userId?: number;

  @AutoAccessor()
  private username?: string;

  @AutoAccessor()
  private email?: string;

  @AutoAccessor()
  private password?: string;

  @AutoAccessor()
  private createdAt?: string;

  @AutoAccessor()
  private updatedAt?: string;

  constructor(init?: Partial<User>) {
    super();
    if (init) this.assign(init as Partial<this>);
  }

  public getUsername!: () => string | undefined;
  public getEmail!: () => string | undefined;
  public getPassword!: () => string | undefined;
  public getCreatedAt!: () => string | undefined;
  public getUpdatedAt!: () => string | undefined;

  public setUsername!: (username: string) => void;
  public setEmail!: (email: string) => void;
  public setPassword!: (password: string) => void;
  public setCreatedAt!: (createdAt: string) => void;
  public setUpdatedAt!: (updatedAt: string) => void;
}
