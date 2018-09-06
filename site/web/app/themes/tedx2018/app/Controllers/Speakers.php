<?php
namespace App\Controllers;
use Sober\Controller\Controller;

class Speakers extends Controller {

	public static function show ($type = 'speakers', $out = '') {

		if (!function_exists('have_rows')) {
			return false;
		}

		$i = 0;
		$items = 9;
		$speakers = get_field('speakers', 'option');
		if ($speakers) {
			foreach ($speakers as $speaker) {

				$i++;
				$speaker = get_post($speaker);

				$out .= '<div class="middle aligned column">
					<a class="ui fluid card" href="' . get_permalink($speaker->ID) . '">
						<div class="image">
							' . get_the_post_thumbnail($speaker->ID, 'full') . '
						</div>
					</a>
				</div>';
			}
		}

		if ($i < $items) {

			for ($x = 0; $x <= $items-$i; $x++) {
			    
			    $out .= '<div class="middle aligned column">
					<div class="ui fluid card">
						<div class="center aligned image">
							<i class="massive red question icon m4"></i>
						</div>
					</div>
				</div>';
			} 
		}

		if ($out) {
			echo $out;
		}
	}
}
?>
