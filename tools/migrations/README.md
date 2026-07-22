# Migration tools

These utilities are retained for provenance and disaster recovery. They are not
part of the normal application build.

## Import the 2018 WordPress content

`import-wordpress-2018.mjs` reads published speaker pages from a local WordPress
database, copies the referenced media, and regenerates the modern web content
module.

Required configuration:

```bash
export WORDPRESS_SITE_ROOT="/path/to/wordpress/public"
export MYSQL_DEFAULTS_FILE="/path/to/mysql/my.cnf"
node tools/migrations/import-wordpress-2018.mjs
```

Optional variables are `WEB_APP_ROOT`, `MYSQL_BIN`, `MYSQL_DATABASE`, and
`MYSQL_USER`. Database credentials belong in the MySQL defaults file and must
not be committed or passed on the command line.
