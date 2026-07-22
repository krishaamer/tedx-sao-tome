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
							<div class="ui header">' . get_sub_field('type') . '</div>
							<a href="' . get_sub_field('url') . '" target="_blank">
								<img src="' . get_sub_field('logo') . '" class="ui fluid image" alt="' . get_sub_field('name') . '" />
							</a>
						</div>';

			}

			$out = '<div class="ui four column stackable doubling grid">' . $out . '</div>';
		} 

		echo $out;
	}
}
?>
