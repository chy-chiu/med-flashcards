jQuery(document).ready(function(){
  jQuery('#tony-button').on('click', function(event) {
    jQuery('#tony').show();
    jQuery('#nick').hide();
    jQuery('#gina').hide();
    jQuery('#ann').hide();
    jQuery('#jenny').hide();
    jQuery('#trish').hide();
    jQuery('#tani').hide();
  });

  jQuery('#nick-button').on('click', function(event) {
    jQuery('#tony').hide();
    jQuery('#nick').show();
    jQuery('#gina').hide();
    jQuery('#ann').hide();
    jQuery('#jenny').hide();
    jQuery('#trish').hide();
    jQuery('#tani').hide();
  });

  jQuery('#gina-button').on('click', function(event) {
    jQuery('#tony').hide();
    jQuery('#nick').hide();
    jQuery('#gina').show();
    jQuery('#ann').hide();
    jQuery('#jenny').hide();
    jQuery('#trish').hide();
    jQuery('#tani').hide();
  });

  jQuery('#ann-button').on('click', function(event) {
    jQuery('#tony').hide();
    jQuery('#nick').hide();
    jQuery('#gina').hide();
    jQuery('#ann').show();
    jQuery('#jenny').hide();
    jQuery('#trish').hide();
    jQuery('#tani').hide();
  });

  jQuery('#jenny-button').on('click', function(event) {
    jQuery('#tony').hide();
    jQuery('#nick').hide();
    jQuery('#gina').hide();
    jQuery('#ann').hide();
    jQuery('#jenny').show();
    jQuery('#trish').hide();
    jQuery('#tani').hide();
  });

  jQuery('#trish-button').on('click', function(event) {
    jQuery('#tony').hide();
    jQuery('#nick').hide();
    jQuery('#gina').hide();
    jQuery('#ann').hide();
    jQuery('#jenny').hide();
    jQuery('#trish').show();
    jQuery('#tani').hide();
  });

  jQuery('#tani-button').on('click', function(event) {
    jQuery('#tony').hide();
    jQuery('#nick').hide();
    jQuery('#gina').hide();
    jQuery('#ann').hide();
    jQuery('#jenny').hide();
    jQuery('#trish').hide();
    jQuery('#tani').show();
  });
});
