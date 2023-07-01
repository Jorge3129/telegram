export abstract class BaseRepository<Entity extends { id: number }> {
  protected abstract rows: Entity[];

  private idSequence = 0;

  constructor() {}

  public saveMany(dtos: Omit<Entity, "id">[]): Promise<Entity[]> {
    return Promise.all(dtos.map((dto) => this.save(dto)));
  }

  public async save(userDto: Omit<Entity, "id">): Promise<Entity> {
    const savedRow = { ...userDto, id: ++this.idSequence } as any;

    this.rows.push(savedRow);

    return savedRow;
  }

  public async find(
    predicate: ((row: Entity) => boolean) | Partial<Entity>
  ): Promise<Entity[]> {
    if (typeof predicate === "function") {
      return this.rows.filter(predicate);
    }

    return (
      this.rows.filter((row) => {
        for (const key of Object.keys(predicate)) {
          if (
            row[key as keyof Entity] !== predicate[key as keyof Partial<Entity>]
          ) {
            return false;
          }
        }

        return true;
      }) ?? null
    );
  }

  public async findOne(
    predicate: ((user: Entity) => boolean) | Partial<Entity>
  ): Promise<Entity | null> {
    return (await this.find(predicate)).at(-1) ?? null;
  }

  public async update(where: Partial<Entity>, updateValue: Partial<Entity>) {
    const rows = await this.find(where);

    rows.forEach((row) => {
      Object.entries(updateValue).forEach(([key, value]) => {
        row[key as keyof Entity] = value as never;
      });
    });
  }
}
