export interface DemoRow {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
    [key: string]: any;
}

const firstNames = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hannah",
];

const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
];

const descriptions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

const generateRandomDate = (start: Date, end: Date): Date => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date;
};

const generateRandomBoolean = (): boolean => {
    return Math.random() < 0.5;
};

const generateRandomRow = (id: number): DemoRow => {
    const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const createdAt = generateRandomDate(new Date(2020, 0, 1), new Date());
    const updatedAt = generateRandomDate(createdAt, new Date());
    const isActive = generateRandomBoolean();
    const isDeleted = generateRandomBoolean();

    return {
        id: id.toString(),
        name,
        description,
        createdAt,
        updatedAt,
        isActive,
        isDeleted,
    };
};

export const generateRandomRows = (count: number): DemoRow[] => {
    const rows: DemoRow[] = [];
    for (let i = 0; i < count; i++) {
        rows.push(generateRandomRow(i));
    }
    return rows;
};