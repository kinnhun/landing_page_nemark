const fs = require('fs').promises;
const path = require('path');

class FileStorage {
  constructor(dataDir) {
    this.dataDir = dataDir;
  }

  /**
   * Ensure directory exists
   */
  async ensureDir() {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (err) {
      console.error('Error creating data directory:', err);
      throw err;
    }
  }

  /**
   * Get file path
   */
  getFilePath(filename) {
    return path.join(this.dataDir, filename);
  }

  /**
   * Read JSON file
   */
  async read(filename) {
    try {
      const filePath = this.getFilePath(filename);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return null; // File not found
      }
      throw err;
    }
  }

  /**
   * Write JSON file
   */
  async write(filename, data) {
    try {
      await this.ensureDir();
      const filePath = this.getFilePath(filename);
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(filePath, jsonData, 'utf-8');
      return data;
    } catch (err) {
      console.error('Error writing file:', err);
      throw err;
    }
  }

  /**
   * Check if file exists
   */
  async exists(filename) {
    try {
      const filePath = this.getFilePath(filename);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Delete file
   */
  async delete(filename) {
    try {
      const filePath = this.getFilePath(filename);
      await fs.unlink(filePath);
      return true;
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false; // File not found
      }
      throw err;
    }
  }

  /**
   * List all files in directory
   */
  async list() {
    try {
      await this.ensureDir();
      const files = await fs.readdir(this.dataDir);
      return files.filter(file => file.endsWith('.json'));
    } catch (err) {
      console.error('Error listing files:', err);
      throw err;
    }
  }
}

module.exports = FileStorage;
