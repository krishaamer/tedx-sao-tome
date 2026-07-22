# Backup manifests

The manifests in this directory verify the versioned snapshots under
`archive/backups/`. Checksums were calculated before relocation, verified after
relocation, and verified again after the files were copied into this
repository.

For example:

```bash
cd archive/backups/2026-06-12
shasum -a 256 -c ../../../docs/backups/2026-06-12.sha256
```
