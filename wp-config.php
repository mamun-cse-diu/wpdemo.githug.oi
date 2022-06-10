<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'mamun' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'hv%Zk./-#cDT3VX}z#LEW*Y*7#b[}fd9!$Cj!okEv}gcVelY(nQ,-#>rK4<=u(:F' );
define( 'SECURE_AUTH_KEY',  'N&p`14&T]&`f&fK$zU6!Zz7Ko#U2oXf0iMcCB7L9y4>nsc8aZ*(#f-Np9hCgK<a7' );
define( 'LOGGED_IN_KEY',    'qL0l+9_;`osjTQSR.J9VBOU8^ND=x,r-EBW&d7QzT{0n#tNf:t4t(jW8|d{i;l^Y' );
define( 'NONCE_KEY',        'dJ(nB-QvbYty!>@Ce:1yKy%h/(0#l*+mv:Wp#fWTf~3I}Z4$RRbTT9-FprE`)5X&' );
define( 'AUTH_SALT',        'hmc:Vo{kT-qhLRVDc=3V;@ yu:|ul8Nz#]7~<VgKSsO~E%~16^O[eb_Zeekh%G<{' );
define( 'SECURE_AUTH_SALT', '#69+>a(X93rT})D]Es;|ND&l,L[?*!W5`la,T5j0!T1eiv 4`yRa<3!`I=&.sW2w' );
define( 'LOGGED_IN_SALT',   'JR$X5jIMs{4(`,8)hMA64_meO D uvzshCmFn./ykUo!=?wswL0mL@JPYBfQx8]w' );
define( 'NONCE_SALT',       '%kKk[^JN@ZcTBMAPs5!jQo~a7v]suS(YoUvs>2>A9NK3-Dvc6^#i{3W@Wa?KdF=j' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
