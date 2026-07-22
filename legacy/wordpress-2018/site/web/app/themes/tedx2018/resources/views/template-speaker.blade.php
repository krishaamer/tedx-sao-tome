{{--
  Template Name: Speaker
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php the_post() @endphp
    @include('partials.content.content-page-speaker')
  @endwhile
@endsection
