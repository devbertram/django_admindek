require('../../config')

import {Link} from "react-router-dom"

import ProfileUsernameForm from "./ProfileUsernameFormComp";
import ProfilePasswordForm from "./ProfilePasswordFormComp";


const ProfileMain = (props) => {

    return (
    <div class="pcoded-content">
        <div class="page-header card">
            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="feather icon-user bg-c-blue"></i>
                        <div class="d-inline">
                            <h5>User Profile</h5>
                            <span>Manage your Account</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="page-header-breadcrumb">
                        <ul class=" breadcrumb breadcrumb-title">
                            <li class="breadcrumb-item">
                                <Link to="/"><i class="feather icon-home"></i></Link>
                            </li>
                            <li class="breadcrumb-item">
                                User Profile
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="pcoded-inner-content">
            <div class="main-body">
                <div class="page-wrapper">
                    <div class="page-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h5>User Info</h5>
                                    </div>
                                    <div class="card-block">
                                        <p class="lead m-t-0">
                                            Name : { props.currentUser.fullname ? props.currentUser.fullname : "N/A"  }
                                        </p>
                                        <p class="lead m-t-0">
                                            Username : { props.currentUser.username }
                                        </p>
                                        <p class="lead m-t-0">
                                            Email : { props.currentUser.email ? props.currentUser.email : "N/A" }
                                        </p>
                                    </div>
                                </div>
                                <ProfileUsernameForm/>
                                <ProfilePasswordForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}

export default ProfileMain