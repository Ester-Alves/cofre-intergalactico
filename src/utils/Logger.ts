import fs from 'fs';
import crypto from 'crypto';
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

/**
 * Utilitário centralizado de logs usando Winston.
 * Suporta logs seguros, rastreamento de sessão e sanitização automática de dados sensíveis.
 */
export class Logger {
  private static sessionId: string = crypto.randomUUID();
  private static executionId: string = '';

  /**
   * Instância interna do Winston configurada com timestamp e identificadores contextuais.
   */
  private static logger: WinstonLogger = createLogger({
    level: 'debug',
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        const id = Logger.executionId || Logger.sessionId;
        const safeMessage = typeof message === 'string' ? Logger.sanitize(message) : String(message);
        return `[ ${timestamp} | ${id} ] [${level.toUpperCase()}] ${safeMessage}`;
      })
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'winston.log' })
    ]
  });

  /**
   * Define um ID único de execução para o teste atual.
   * Chamado antes de cada teste para isolar os logs por caso de teste.
   * @param id ID personalizado opcional
   */
  static setExecutionId(id?: string): void {
    Logger.executionId = id || crypto.randomUUID();
  }

  /**
   * Limpa o conteúdo do arquivo de log.
   * Útil para reiniciar o histórico de execução de testes em uma nova rodada.
   */
  static clearLogFile(): void {
    try {
      fs.writeFileSync('winston.log', '', 'utf8');
      Logger.logger.info(`[Logger] Arquivo de log limpo e reiniciado`);
    } catch (error: any) {
      Logger.logger.error(`[Logger] Falha ao limpar o arquivo de log: ${error.message}`);
    }
  }

  static debug(message: string): void {
    Logger.logger.debug(message);
  }

  static info(message: string): void {
    Logger.logger.info(message);
  }

  static warn(message: string): void {
    Logger.logger.warn(message);
  }

  static error(message: string): void {
    Logger.logger.error(message);
  }

  /**
   * Registra uma mensagem de debug sanitizada, removendo conteúdo sensível.
   * @param message A mensagem a ser registrada
   */
  static secure(message: string): void {
    Logger.logger.debug(Logger.sanitize(message));
  }

  /**
   * Remove conteúdo sensível das mensagens de log usando regex.
   * @param message Mensagem bruta do log
   * @returns Mensagem sanitizada
   */
  private static sanitize(message: string): string {
    return message
      .replace(/([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '***@***.com') // email
      .replace(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g, '***.***.***-**') // CPF
      .replace(/(["']?password["']?\s*[:=]\s*["']?).+?(["'])/gi, '$1******$2') // password
      .replace(/\bBearer\s+[a-zA-Z0-9\-._~+/]+=*/gi, 'Bearer ******'); // token
  }
}