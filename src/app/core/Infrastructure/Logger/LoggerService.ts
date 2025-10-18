import {ILogger, LogLevel} from '../Contracts/Logger.interface';

/**
 * Configuración del Logger
 */
interface LoggerConfig {
  minLevel: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
  appName: string;
}

/**
 * Implementación del Logger Service
 * Proporciona logging estructurado con contexto y niveles
 */
export class LoggerService implements ILogger {
  private context: Record<string, unknown> = {};
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      minLevel: LogLevel.DEBUG,
      enableConsole: true,
      enableRemote: false,
      appName: 'RNTemplateHexagonal',
      ...config,
    };
  }

  setContext(context: Record<string, unknown>): void {
    this.context = {...this.context, ...context};
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, undefined, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, undefined, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, undefined, context);
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, error, context);
  }

  private log(
    level: LogLevel,
    message: string,
    error?: unknown,
    context?: Record<string, unknown>,
  ): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const logEntry = this.createLogEntry(level, message, error, context);

    if (this.config.enableConsole) {
      this.logToConsole(level, logEntry);
    }

    if (this.config.enableRemote) {
      this.logToRemote(logEntry);
    }
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    error?: unknown,
    context?: Record<string, unknown>,
  ): Record<string, unknown> {
    const entry: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      level,
      message,
      app: this.config.appName,
      ...this.context,
      ...context,
    };

    if (error) {
      entry.error = this.serializeError(error);
    }

    return entry;
  }

  private logToConsole(level: LogLevel, entry: Record<string, unknown>): void {
    const emoji = this.getLevelEmoji(level);
    const timestamp = new Date().toLocaleTimeString();

    const consoleMessage = `${emoji} [${timestamp}] ${entry.message}`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(consoleMessage, entry);
        break;
      case LogLevel.INFO:
        console.info(consoleMessage, entry);
        break;
      case LogLevel.WARN:
        console.warn(consoleMessage, entry);
        break;
      case LogLevel.ERROR:
        console.error(consoleMessage, entry);
        break;
    }
  }

  private logToRemote(entry: Record<string, unknown>): void {
    // TODO: Implementar envío a servicio remoto (Sentry, LogRocket, etc.)
    // Por ahora solo simular
    if (__DEV__) {
      console.log('[Remote Log]', entry);
    }
  }

  private serializeError(error: unknown): Record<string, unknown> {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    return {
      message: String(error),
    };
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const minLevelIndex = levels.indexOf(this.config.minLevel);
    const currentLevelIndex = levels.indexOf(level);

    return currentLevelIndex >= minLevelIndex;
  }

  private getLevelEmoji(level: LogLevel): string {
    const emojis = {
      [LogLevel.DEBUG]: '🐛',
      [LogLevel.INFO]: 'ℹ️',
      [LogLevel.WARN]: '⚠️',
      [LogLevel.ERROR]: '❌',
    };

    return emojis[level] || '📝';
  }
}

// Instancia singleton para uso global
export const logger = new LoggerService({
  minLevel: __DEV__ ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: true,
  enableRemote: !__DEV__,
});
