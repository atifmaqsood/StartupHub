import usersData from '../data/users.json';
import projectsData from '../data/projects.json';
import tasksData from '../data/tasks.json';
import leadsData from '../data/leads.json';
import teamData from '../data/team.json';
import notificationsData from '../data/notifications.json';

const STORAGE_PREFIX = 'startuphub_';
const LATENCY_MIN = 300;
const LATENCY_MAX = 600;

export type EntityName = 'users' | 'projects' | 'tasks' | 'leads' | 'team' | 'notifications';

const INITIAL_DATA: Record<EntityName, any[]> = {
  users: usersData,
  projects: projectsData,
  tasks: tasksData,
  leads: leadsData,
  team: teamData,
  notifications: notificationsData,
};

class MockDatabaseService {
  private getStorageKey(entity: EntityName): string {
    return `${STORAGE_PREFIX}${entity}.db`;
  }

  private simulateLatency(): Promise<void> {
    const delay = Math.floor(Math.random() * (LATENCY_MAX - LATENCY_MIN + 1) + LATENCY_MIN);
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  private getData(entity: EntityName): any[] {
    const key = this.getStorageKey(entity);
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
    // Initialize with default data if not present
    const initial = INITIAL_DATA[entity];
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }

  private setData(entity: EntityName, data: any[]): void {
    const key = this.getStorageKey(entity);
    localStorage.setItem(key, JSON.stringify(data));
  }

  async getAll(entity: EntityName): Promise<any[]> {
    await this.simulateLatency();
    return this.getData(entity);
  }

  async getById(entity: EntityName, id: string | number): Promise<any | null> {
    await this.simulateLatency();
    const data = this.getData(entity);
    return data.find((item) => String(item.id) === String(id)) || null;
  }

  async create(entity: EntityName, item: any): Promise<any> {
    await this.simulateLatency();
    const data = this.getData(entity);
    const newItem = {
      ...item,
      id: item.id || `${entity.charAt(0)}${Date.now()}`,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.push(newItem);
    this.setData(entity, data);
    return newItem;
  }

  async update(entity: EntityName, id: string | number, updates: any): Promise<any> {
    await this.simulateLatency();
    const data = this.getData(entity);
    const index = data.findIndex((item) => String(item.id) === String(id));
    if (index === -1) throw new Error(`${entity} with id ${id} not found`);

    const updatedItem = {
      ...data[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    data[index] = updatedItem;
    this.setData(entity, data);
    return updatedItem;
  }

  async delete(entity: EntityName, id: string | number): Promise<boolean> {
    await this.simulateLatency();
    const data = this.getData(entity);
    const index = data.findIndex((item) => String(item.id) === String(id));
    if (index === -1) throw new Error(`${entity} with id ${id} not found`);

    data.splice(index, 1);
    this.setData(entity, data);
    return true;
  }

  // Helper for batch operations if needed
  async bulkUpdate(entity: EntityName, items: any[]): Promise<any[]> {
    await this.simulateLatency();
    this.setData(entity, items);
    return items;
  }
}

export const mockDB = new MockDatabaseService();
