<?php
echo '<div id="cg_comments_slider_div" style="display:none;">';

echo '<div id="cg_comments_slider_inner_div" style="width:90%;margin: 0px auto;">';

echo '<div id="close_slider_comments_button"><img id="close_slider_comments_button_img" src="'.$cg_slider_button.'" style="width:100% ;height:100% ;display:none;"></div>';
echo "<p style='text-align:center;font-size:22px;padding-top:30px;color:#fff;font-weight:bold;opacity: 1;' id='cg_picture_comments_single_view'>$language_PictureComments</p>";
echo "<div id='cg_slider_top_hr_div'>";
echo "<hr  style='margin-left:0px;' id='cg_picture_comments_single_view_hr' />";
echo '</div>';
// Response div f�r AJAX call
echo "<div id='show_comments_slider' >";
echo '</div>';

$unix = time();


echo "<div id='cg_slider_comment_hint_msg' style='color:#fff;font-weight:normal;font-size:18px;'>";
echo "</div>";

echo "<p style='padding-top:30px;color:#fff;font-weight:bold;font-size:22px;line-height:22px;padding-bottom:0px;margin-bottom:0px;' id='cg_your_comment_single_view'><strong>$language_YourComment:</strong></p>";
echo '<input type="hidden" name="Timestamp" value="'.@$unix.'" id="cg_slider_comment_timestamp">';
echo "<p style='line-height:18px;margin:0px;padding:0px;'>&nbsp;</p>";
echo "<div id='cg_your_comment_name_single_view' style='font-size:18px;font-weight:bold;color:#fff;'><label for='cg_slider_comment_name'>$language_Name:</label></div>";
echo '<p style="line-height:18px;margin:0px;padding:0px;"><input type="text" name="Name" style="width:100%;" id="cg_slider_comment_name"></p>';
echo "<p style='line-height:18px;margin:0px;padding:0px;'>&nbsp;</p>";
echo "<div id='cg_your_comment_comment_single_view'  style='font-size:18px;font-weight:bold;color:#fff;'><label for='cg_slider_comment'>$language_Comment:</label></div>";
echo '<p style="margin:0px;padding:0px;"><textarea style="width:100%;" rows="5" name="Comment" id="cg_slider_comment">';
echo "</textarea></p>";
echo "<p style='line-height:18px;margin:0px;padding:0px;'>&nbsp;</p>";
echo '<p id="cg_i_am_not_a_robot" style="font-weight:bold;font-size:18px;width:300px;color:#fff;line-height:18px;"></p>';
echo "<p style='line-height:18px;margin:0px;padding:0px;'>&nbsp;</p>";
echo "<p style='line-height:18px;margin:0px;padding:0px;color: white;'>";
echo '<input type="submit" value="'.$language_Send.'" name="Submit" id="cg_slider_comment_submit" style="font-size:18px;line-height:18px;">';
echo "</p>";
echo "<p style='line-height:18px;margin:0px;padding:0px;'>&nbsp;</p>";
echo "</div>";
echo "</div>";

echo "<div style='visibility:hidden;margin:0;padding:0;height:0px !important;'>";
echo '<label for="Email">Don\'t fill this field, your email will not be asked.</label>';
echo '<input id="cg_slider_comment_email" name="Email" size="60" value="" />';
echo '</div>';

?>