<!doctype html>
<html {{ get_language_attributes() }}>
  @include('partials.header.head')
  <body @php body_class() @endphp>
    @php do_action('get_header') @endphp
    <div class="ui fluid container" role="document">
      <main class="main">
        @yield('content')
      </main>
    </div>
    @php do_action('get_footer') @endphp
    @php wp_footer() @endphp
  </body>
</html>
