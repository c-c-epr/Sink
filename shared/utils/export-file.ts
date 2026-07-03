export function createExportFilename(prefix: string, extension: string, date = new Date()): string {
  const normalizedExtension = extension.startsWith('.') ? extension.slice(1) : extension

  const timestamp = date.toISOString().replaceAll(':', '-').replaceAll('.', '-')

  return `${prefix}-${timestamp}.${normalizedExtension}`
}
