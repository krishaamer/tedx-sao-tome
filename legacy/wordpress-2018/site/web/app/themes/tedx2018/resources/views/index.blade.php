@extends('layouts.app')

@section('content')
  @include('partials.header.page-header')

  @if (!have_posts())
    <div class="alert alert-warning">
      {{ __('Sorry, no results were found.', 'sage') }}
    </div>
  @endif

  @while (have_posts()) @php the_post() @endphp
    @include('partials.content.content-'.get_post_type())
  @endwhile

@endsection
