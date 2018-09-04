@include('partials.content.section.menu')

<div class="ui section speaker-single" id="speaker-single">
	<div class="ui basic segment red background">
		<div class="ui container what">
			<div class="ui middle aligned stackable doubling relaxed grid">
				<div class="six wide column">
					<h2 class="ui white text">Estrela Matilde</h2>
				</div>
				<div class="six wide column">
					<h4 class="ui white text"></h4>
				</div>
			</div>
		</div>
	</div>
	<div class="ui basic segment white background">
		<div class="ui container ted">
			<div class="ui two column stackable doubling relaxed grid">
				<div class="column">
					@php the_content() @endphp
				</div>
				<div class="column">
					<div class="ui fluid card">
						<div class="image">
							<img src="@asset('images/speakers/estrela-matilde.jpg')">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@include('partials.content.section.theme')
@include('partials.content.section.sponsors')
@include('partials.content.section.footer')
