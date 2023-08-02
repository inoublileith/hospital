import React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
const Profile = () => {
  const navigate = useNavigate()
  const { user: currentUser } = useSelector((state) => state.auth)
  if (!currentUser) {
    return navigate('/login')
  }
  return (
    <div classNameName='container'>
             <div class="row">
                        <div class="col-sm-5">
                           <div class="user-profile compact">
                              <div class="up-head-w" background-image='img/profile_bg1.jpg'>
                                 <div class="up-social"><a href="#"><i class="os-icon os-icon-twitter"></i></a><a href="#"><i class="os-icon os-icon-facebook"></i></a></div>
                                 <div class="up-main-info">
                                    <h2 class="up-header">John Mayers</h2>
                                    <h6 class="up-sub-header">Product Designer at Facebook</h6>
                                 </div>
                                
                              </div>
                              <div class="up-controls">
                                 <div class="row">
                                    <div class="col-sm-6">
                                       <div class="value-pair">
                                          <div class="label">Status:</div>
                                          <div class="value badge badge-pill badge-success">Online</div>
                                       </div>
                                    </div>
                                    <div class="col-sm-6 text-right"><a class="btn btn-primary btn-sm" href="#"><i class="os-icon os-icon-link-3"></i><span>Add to Friends</span></a></div>
                                 </div>
                              </div>
                              <div class="up-contents">
                                 <div class="m-b">
                                    <div class="row m-b">
                                       <div class="col-sm-6 b-r b-b">
                                          <div class="el-tablo centered padded-v">
                                             <div class="value">25</div>
                                             <div class="label">Products Sold</div>
                                          </div>
                                       </div>
                                       <div class="col-sm-6 b-b">
                                          <div class="el-tablo centered padded-v">
                                             <div class="value">315</div>
                                             <div class="label">Friends</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="padded">
                                       <div class="os-progress-bar primary">
                                          <div class="bar-labels">
                                             <div class="bar-label-left"><span>Profile Completion</span><span class="positive">+10</span></div>
                                             <div class="bar-label-right"><span class="info">72/100</span></div>
                                          </div>
                                          <div class="bar-level-1" width= '100%'>
                                             <div class="bar-level-2" width= '80%'>
                                                <div class="bar-level-3" width= '30%'></div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="os-progress-bar primary">
                                          <div class="bar-labels">
                                             <div class="bar-label-left"><span>Status Unlocked</span><span class="positive">+5</span></div>
                                             <div class="bar-label-right"><span class="info">45/100</span></div>
                                          </div>
                                          <div class="bar-level-1" width='100%'>
                                             <div class="bar-level-2" width= '30%'>
                                                <div class="bar-level-3" width= '10%'></div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="os-progress-bar primary">
                                          <div class="bar-labels">
                                             <div class="bar-label-left"><span>Followers</span><span class="negative">-12</span></div>
                                             <div class="bar-label-right"><span class="info">74/100</span></div>
                                          </div>
                                          <div class="bar-level-1" width= '100%'>
                                             <div class="bar-level-2" width= '80%'>
                                                <div class="bar-level-3" width= '60%'></div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="element-wrapper">
                              <div class="element-box">
                                 <h6 class="element-header">User Activity</h6>
                                 <div class="timed-activities compact">
                                    <div class="timed-activity">
                                       <div class="ta-date"><span>21st Jan, 2017</span></div>
                                       <div class="ta-record-w">
                                          <div class="ta-record">
                                             <div class="ta-timestamp"><strong>11:55</strong> am</div>
                                             <div class="ta-activity">Created a post called <a href="#">Register new symbol</a> in Rogue</div>
                                          </div>
                                          <div class="ta-record">
                                             <div class="ta-timestamp"><strong>2:34</strong> pm</div>
                                             <div class="ta-activity">Commented on story <a href="#">How to be a leader</a> in <a href="#">Financial</a> category</div>
                                          </div>
                                          <div class="ta-record">
                                             <div class="ta-timestamp"><strong>7:12</strong> pm</div>
                                             <div class="ta-activity">Added <a href="#">John Silver</a> as a friend</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="timed-activity">
                                       <div class="ta-date"><span>3rd Feb, 2017</span></div>
                                       <div class="ta-record-w">
                                          <div class="ta-record">
                                             <div class="ta-timestamp"><strong>9:32</strong> pm</div>
                                             <div class="ta-activity">Added <a href="#">John Silver</a> as a friend</div>
                                          </div>
                                          <div class="ta-record">
                                             <div class="ta-timestamp"><strong>5:14</strong> pm</div>
                                             <div class="ta-activity">Commented on story <a href="#">How to be a leader</a> in <a href="#">Financial</a> category</div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="col-sm-7">
                           <div class="element-wrapper">
                              <div class="element-box">
                                 <form id="formValidate">
                                    <div class="element-info">
                                       <div class="element-info-with-icon">
                                          <div class="element-info-icon">
                                             <div class="os-icon os-icon-wallet-loaded"></div>
                                          </div>
                                          <div class="element-info-text">
                                             <h5 class="element-inner-header">Profile Settings</h5>
                                             <div class="element-inner-desc">Validation of the form is made possible using powerful validator plugin for bootstrap. <a href="http://1000hz.github.io/bootstrap-validator/" target="_blank">Learn more about Bootstrap Validator</a></div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="form-group">
                                       <label for=""> Email address</label><input class="form-control" data-error="Your email address is invalid" placeholder="Enter email" required="required" type="email"/>
                                       <div class="help-block form-text with-errors form-control-feedback"></div>
                                    </div>
                                    <div class="row">
                                       <div class="col-sm-6">
                                          <div class="form-group">
                                             <label for=""> Password</label><input class="form-control" data-minlength="6" placeholder="Password" required="required" type="password"/>
                                             <div class="help-block form-text text-muted form-control-feedback">Minimum of 6 characters</div>
                                          </div>
                                       </div>
                                       <div class="col-sm-6">
                                          <div class="form-group">
                                             <label for="">Confirm Password</label><input class="form-control" data-match-error="Passwords don&#39;t match" placeholder="Confirm Password" required="required" type="password"/>
                                             <div class="help-block form-text with-errors form-control-feedback"></div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="form-group">
                                       <label for=""> Regular select</label>
                                       <select class="form-control">
                                          <option value="New York">New York</option>
                                          <option value="California">California</option>
                                          <option value="Boston">Boston</option>
                                          <option value="Texas">Texas</option>
                                          <option value="Colorado">Colorado</option>
                                       </select>
                                    </div>
                                    <div class="form-group">
                                       <label for=""> Multiselect</label>
                                       <select class="form-control select2" multiple="true">
                                          <option selected="true">New York</option>
                                          <option selected="true">California</option>
                                          <option>Boston</option>
                                          <option>Texas</option>
                                          <option>Colorado</option>
                                       </select>
                                    </div>
                                    <fieldset class="form-group">
                                       <legend><span>Section Example</span></legend>
                                       <div class="row">
                                          <div class="col-sm-6">
                                             <div class="form-group">
                                                <label for=""> First Name</label><input class="form-control" data-error="Please input your First Name" placeholder="First Name" required="required" type="text"/>
                                                <div class="help-block form-text with-errors form-control-feedback"></div>
                                             </div>
                                          </div>
                                          <div class="col-sm-6">
                                             <div class="form-group">
                                                <label for="">Last Name</label><input class="form-control" data-error="Please input your Last Name" placeholder="Last Name" required="required" type="text"/>
                                                <div class="help-block form-text with-errors form-control-feedback"></div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="row">
                                          <div class="col-sm-6">
                                             <div class="form-group"><label for=""> Date of Birth</label><input class="single-daterange form-control" placeholder="Date of birth" type="text" value="04/12/1978"/></div>
                                          </div>
                                          <div class="col-sm-6">
                                             <div class="form-group">
                                                <label for="">Twitter Username</label>
                                                <div class="input-group">
                                                   <div class="input-group-prepend">
                                                      <div class="input-group-text">@</div>
                                                   </div>
                                                   <input class="form-control" placeholder="Twitter Username" type="text"/>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="form-group"><label for="">Date Range Picker</label><input class="multi-daterange form-control" type="text" value="03/31/2017 - 04/06/2017"/></div>
                                       <div class="form-group"><label> Example textarea</label><textarea class="form-control" rows="3"></textarea></div>
                                    </fieldset>
                                    <div class="form-check"><label class="form-check-label"><input class="form-check-input" type="checkbox"/>I agree to terms and conditions</label></div>
                                    <div class="form-buttons-w"><button class="btn btn-primary" type="submit"> Submit</button></div>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>
    </div>
  )
}
export default Profile
