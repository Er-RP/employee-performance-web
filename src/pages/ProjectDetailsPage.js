import React from 'react'
import ProjectDetails from '../components/projects/ProjectDetails'
import withRole from '../helpers/hoc/withRole'

const ProjectDetailsPage = () => {
  return (
    <div><ProjectDetails/></div>
  )
}

export default withRole(ProjectDetailsPage) 