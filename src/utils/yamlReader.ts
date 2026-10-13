import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

type Folder = 'config' | 'data';

export class YamlReader {

  /** Ambiente atual, vindo do .env ou da linha de comando. */
  static get environment(): string {
    const env = process.env.ENVIRONMENT;
    if (!env) {
      throw new Error('Defina ENVIRONMENT no .env (ex.: qa ou prod).');
    }
    return env;
  }

  /**
   * Lê src/resources/<folder>/url-<ambiente>.yml e devolve o conteúdo.
   * @param folder      'config' ou 'data'
   * @param key         Chave desejada. Aceita caminho aninhado ('usuario.email').
   *                    Se omitida, devolve o arquivo inteiro.
   * @param environment Ambiente (padrão: ENVIRONMENT do .env)
   */
  static get<T = any>(folder: Folder, key?: string, environment: string = YamlReader.environment): T {
    const fileName = `url-${environment}.yml`;
    const filePath = path.resolve(__dirname, `../resources/${folder}/${fileName}`);

    let content: unknown;
    try {
      content = yaml.load(fs.readFileSync(filePath, 'utf8'));
    } catch (error: any) {
      throw new Error(`Não foi possível ler ${filePath}: ${error.message}`);
    }

    if (!key) return content as T;

    const value = key
      .split('.')
      .reduce<any>((obj, part) => (obj == null ? undefined : obj[part]), content);

    if (value === undefined) {
      throw new Error(`Chave "${key}" não encontrada em ${folder}/${fileName}`);
    }
    return value as T;
  }
}