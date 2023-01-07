package com.BScamp.MovieTheater.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BScamp.MovieTheater.entity.Category;
import com.BScamp.MovieTheater.repository.CategoryRepo;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	CategoryRepo categroyRepo;

	@Override
	public List<Category> getAll() {
		return categroyRepo.findAll();
	}

	@Override
	public Category get(int id) {
		return categroyRepo.findById(id).orElse(null);
	}

	@Override
	public Category create(Category category) {
		// Category Create
		return categroyRepo.save(category);
	}

	@Override
	public Category update(int id, Category category) {
		Category toUpdateCategory = this.get(id);
		if (toUpdateCategory == null) {
			return null;
		}
		toUpdateCategory.setId(id);
		toUpdateCategory.setName(category.getName());
		return categroyRepo.save(category);
	}

	@Override
	public boolean delete(int id) {
		Category category = this.get(id);
		if (category == null) {
			return false;
		}
		categroyRepo.deleteById(id);
		return true;
	}

}
