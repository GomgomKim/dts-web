function isValidVersion(version: string): boolean {
  const regex = /^\d+\.\d+\.\d+$/
  return regex.test(version)
}

export default function isOldVersion(
  oldVersion: string,
  recentVersion: string
): boolean {
  if (!isValidVersion(oldVersion) || !isValidVersion(recentVersion)) {
    console.error(
      'invalid version format. version must be in MAJOR.MINOR.PATCH format'
    )

    return false
  }

  const oldVersionParts = oldVersion.split('.').map(Number)
  const recentVersionParts = recentVersion.split('.').map(Number)

  for (let i = 0; i < recentVersionParts.length; i++) {
    if (oldVersionParts[i] < recentVersionParts[i]) {
      return true
    } else if (oldVersionParts[i] > recentVersionParts[i]) {
      return false
    }
  }

  return false
}
