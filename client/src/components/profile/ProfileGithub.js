import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import spinner from '../layout/Spinner'
import { getGithubrepos } from '../../actions/profile'

const ProfileGithub = ({ username, getGithubrepos, repos }) => {
    useEffect(() => {
        getGithubrepos(username);
    }, [getGithubrepos]);

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Github Repos</h2>
            {repos === null ? <spinner /> : (
                repos.map(repo => (
                    <div key={repo._id} className='repo bg-white p-1 my-1'>
                        <div>
                            <h4>
                                <a href={repo.html_url} target="_blank" rel="noopener norefferer">
                                    {repo.name}
                                </a>
                            </h4>
                            <p>
                                {repo.description}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className="badge badge-dar">
                                    Watchers: {repo.watchers_count}
                                </li>
                                <li className="badge badge-primary">
                                    Forks: {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

ProfileGithub.propTypes = {
    getGithubrepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubrepos })(ProfileGithub)
