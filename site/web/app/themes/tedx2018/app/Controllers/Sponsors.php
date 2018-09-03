<?php
namespace App\Controllers;
use Sober\Controller\Controller;

class Sponsors extends Controller {

	public static function show ($type = 'sponsors', $out = '') {

		if (!function_exists('have_rows')) {
			return false;
		}

		if (have_rows($type, 'option')) {
			while (have_rows($type, 'option')) { 

				the_row();

				$out .= '<div class="column">
							<a href="' . get_sub_field('url') . '" target="_blank">
								<img src="' . get_sub_field('logo') . '" class="ui fluid image" style="height: 100%;" alt="' . get_sub_field('name') . '" />
							</a>
						</div>';

			}
		} 

		echo $out;
	}
}
?>
