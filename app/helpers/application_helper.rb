module ApplicationHelper

  def mac?
    request.user_agent =~ /\bMac OS\b/
  end
  
  def analytics_code
    <<-CODE
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
    document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript">
    try {
    var pageTracker = _gat._getTracker("UA-5355510-2");
    pageTracker._trackPageview();
    } catch(err) {}
    CODE
  end

end
